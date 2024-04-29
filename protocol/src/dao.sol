// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import {ITreasury, IStakERC20, IUltNft, ISwapper, IP2PLending} from "./interfaces.sol";

contract DAO {
    struct Proposal {
        uint id;
        string description;
        uint forVotes;
        uint againstVotes;
        uint time_created;
        bool executed;
        bool status;
        address creator;
    }
    struct Member {
        address useraddr;
        string _username;
        uint256 _noOfVotes;
        bool status;
        uint lastactivetime;
        uint daoPoints;
    }
    mapping(address => mapping(uint => bool)) voted;
    mapping(uint => Proposal) public proposals;
    mapping(address => Member) public members;
    mapping(address => uint) public withdrawal;
    uint256 public proposalCount;
    uint256 public memberCount;
    uint public quorum;

    address public treasury;
    address public UltNft;
    address public UltErc20;
    address public stakeErc20;
    address public swap;
    address public p2plending;

    event ProposalCreated(uint indexed id, string description);
    event Voted(uint indexed proposalId, address indexed voter, bool vote);
    event ProposalExecuted(uint indexed proposalId);
    event ProposalRemoved(address _creator, uint _id);

    constructor(
        uint _quorum,
        address _treasury,
        address _nft,
        address _erc20,
        address _staking,
        address _swap,
        address _p2plending
    ) {
        quorum = _quorum;
        treasury = _treasury;
        UltNft = _nft;
        UltErc20 = _erc20;
        stakeErc20 = _staking;
        swap = _swap;
        p2plending=_p2plending;
    }

    modifier onlyMember() {
        require(members[msg.sender].status, "Unauthorized access");
        _;
    }

    modifier validateAction(uint _proposalId) {
        require(proposals[_proposalId].status, "Proposal is not active");
        require(!proposals[_proposalId].executed, "Proposal already executed");
        require(proposals[_proposalId].forVotes > 1, "dubious vote");
        require(
            proposals[_proposalId].forVotes >
                proposals[_proposalId].againstVotes,
            "Proposal not approved"
        );
        _;
    }
    modifier proposal_time_check(uint _proposalId, uint _maxDuration) {
        require(
            block.timestamp <=
                proposals[_proposalId].time_created + _maxDuration,
            "action duration timeout"
        );
        _;
    }
    modifier proposal_time_out(uint _proposalId, uint _maxDuration) {
        require(
            block.timestamp >=
                proposals[_proposalId].time_created + _maxDuration,
            "action not allowd"
        );
        _;
    }

    modifier hasMinimumUltBalance(address _member) {
        require(IERC721(UltNft).balanceOf(_member) > 0, "not qualified");
        require(
            IERC20(UltErc20).balanceOf(_member) >= (100 ether),
            "not qualified"
        );
        _;
    }

    modifier isActiveMember(address _member) {
        require(
            members[_member].lastactivetime + 365 days > block.timestamp,
            "Inactive member"
        );
        _;
    }

    function addMember(
        address _member,
        string memory _username
    ) external hasMinimumUltBalance(_member) {
        require(memberCount < 100, "max members reached");
        members[_member] = Member(
            _member,
            _username,
            0,
            true,
            block.timestamp,
            0
        );
        memberCount++;
    }

    function removeMember(
        address _member,
        uint _id
    ) external validateAction(_id) onlyMember {
        require(members[_member].status, "Member doesn't exist");
        delete members[_member];
        memberCount--;
    }

    function createProposal(
        string memory _description
    ) external onlyMember returns (uint) {
        uint proposalId = proposalCount++;
        proposals[proposalId] = Proposal(
            proposalId,
            _description,
            0,
            0,
            block.timestamp,
            false,
            true,
            msg.sender
        );
        members[msg.sender].lastactivetime = block.timestamp;
        members[msg.sender].daoPoints += 10;
        emit ProposalCreated(proposalId, _description);
        return proposalId;
    }

    function removeProposal(
        uint _id
    ) public proposal_time_check(_id, 2 days) onlyMember{
        require(
            msg.sender == proposals[_id].creator,
            "Only the creator can remove the proposal"
        );
        require(!proposals[_id].executed, "Proposal already executed");
        delete proposals[_id];
        members[msg.sender].lastactivetime = block.timestamp;
        emit ProposalRemoved(msg.sender, _id);
    }

    function vote(
        uint _proposalId,
        bool _vote
    ) external onlyMember isActiveMember(msg.sender) {
        Proposal storage proposal = proposals[_proposalId];
        require(!voted[msg.sender][_proposalId], "Already voted");
        require(!proposal.executed, "Proposal already executed");
        require(proposal.status, "Proposal not active");

        if (_vote) {
            proposal.forVotes += 1;
        } else {
            proposal.againstVotes += 1;
        }
        voted[msg.sender][_proposalId] = true;
        members[msg.sender].lastactivetime = block.timestamp;
        members[msg.sender].daoPoints += 5;
        emit Voted(_proposalId, msg.sender, _vote);
    }

    function isProposalPassed(uint _id) internal view returns (bool) {
        Proposal storage _proposal = proposals[_id];
        return _proposal.forVotes > _proposal.againstVotes;
    }


    function closeProposal(
        uint _id
    ) public proposal_time_out(_id, 7 days) onlyMember {
        Proposal storage proposal = proposals[_id];
        require(
            msg.sender == proposal.creator,
            "Only the creator can close the proposal"
        );
        members[msg.sender].lastactivetime = block.timestamp;
        proposal.status = false;
    }

    function executeProposal(uint _proposalid) internal {
        Proposal storage proposal = proposals[_proposalid];
        proposal.executed = true;
        members[proposal.creator].daoPoints += 50;
        emit ProposalExecuted(_proposalid);
    }

    function approveWithdrawal(
        uint _proposalid,
        address _candidate,
        uint _amount
    ) external validateAction(_proposalid) onlyMember {
        Proposal storage proposal = proposals[_proposalid];
        require(proposal.executed == false, "proposal already executed");
        ITreasury(treasury).authorize(_candidate);
        withdrawal[_candidate] = _amount;
        executeProposal(_proposalid);
    }

    function mintNft(string memory _uri) public {
        uint stakedbalance = IStakERC20(stakeErc20)
            .stakeassets(msg.sender, UltErc20)
            .capital;
        require(stakedbalance >= 1000 ether, "not qualified");
        IUltNft(UltNft).safeMint(msg.sender, _uri);
    }

    function addAcceptedCollateral(
        uint _proposalId,
        address _collateraladdress
    ) external validateAction(_proposalId) onlyMember {
        require(
            proposals[_proposalId].status,
            "Proposal does not exist or is not active"
        );
        require(
            !proposals[_proposalId].executed,
            "Proposal does not exist or is not active"
        );
        executeProposal(_proposalId);

        IP2PLending(p2plending).addCollateral(_collateraladdress);
    }

    function addSwappableToken(
        uint _proposalId,
        uint _decimal,
        address _pricefeed,
        address _tokenaddress
    ) external validateAction(_proposalId) onlyMember {
        require(
            proposals[_proposalId].status,
            "Proposal does not exist or is not active"
        );
        require(
            !proposals[_proposalId].executed,
            "Proposal does not exist or is not active"
        );
        ISwapper(swap).addSwappableToken(_pricefeed, _decimal, _tokenaddress);
        executeProposal(_proposalId);
    }

    function addStakableToken(
        uint _proposalId,
        address _tokenaddress
    ) external validateAction(_proposalId) onlyMember {
        require(
            proposals[_proposalId].status,
            "Proposal does not exist or is not active"
        );
        require(
            !proposals[_proposalId].executed,
            "Proposal does not exist or is not active"
        );
        executeProposal(_proposalId);

        IStakERC20(swap).addStakableToken(_tokenaddress);
    }

    function setTokenPrice(
        uint newprice,
        uint _proposalId
    ) external validateAction(_proposalId) onlyMember {
        require(
            proposals[_proposalId].status,
            "Proposal does not exist or is not active"
        );
        require(
            !proposals[_proposalId].executed,
            "Proposal does not exist or is not active"
        );
        executeProposal(_proposalId);

        ITreasury(treasury).setTokenPrice(newprice);
    }
}
