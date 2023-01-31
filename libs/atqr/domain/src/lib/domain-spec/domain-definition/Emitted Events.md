Events emitted by:
  Goal Aggregate (depends on Challenge Repository):

    - GoalCreated! (goal: Goal)
    - ChargeAuthorized! (owner: Contact, pledge: number, ownerPaymentMethod: PaymentMethod )
    - ChallengeCreated! (params?)

  root Challenge (depends on Payment Service)

    - ChallengeAccepted!
    - OfficiationRequestAccepted!
    - FundsAvailable! :challengeId :paymentMethod
    - FundsDenied! :challengeId
    - ChallengeAccepted!
    - ContenderRejectedTheChallenge!
    - ChallengeCanceled!
    - ChallengeGotANewInvitee! :challenge, invitee: Invitee
    - ContenderRemovedJudge! :judgeEmail
    - OfficiationRequestAccepted! :challengeId :judgeId
    - YourJudgeRequestHaveBeenRejected! :challengeId :judgeId
    - ChallengeAccomplished!
    - ChallengeFailed!
    - ContenderParticipationRequested!
    - JudgeRequested!
    - OfficiationRequested!

