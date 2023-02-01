Events emitted by:
  Goal Aggregate root (depends on Challenge Repository):

    - GoalCreated! (goal: Goal)
    - ChargeAuthorized! (owner: Contact, pledge: number, ownerPaymentMethod: PaymentMethod )
    - ChallengeCreated! (params?)

  Challenge Aggregate root (depends on Payment Service):

    - FundsAvailable! :challengeId :paymentMethod
    - FundsDenied! :challengeId
    - ChallengeCanceled!
    - ChallengeGotANewInvitee! :challenge, invitee: Invitee
    - ContenderRemovedJudge! :judgeEmail

    User entity:
      - UserCreated! :user
    
    PaymentMethod entity:
      - 📧 CardCharged! :auth :amountInCents ?
      - CardChargeFailed! :auth :amountInCents

  DeadlineMonitor service (Depends on ChallengesService)
    - DeadlineReached! :challengeId
    - ReminderToPlay! :challengeId :list
    - LastChanceToPlay! :challengeId :list
    - YourContenderIgnoredTheChallenge! :challenge
    - YourJudgeRequestHaveBeenIgnored *WHERE IS IT IN DEADLINE MONITOR
    - YourOfficiationRequestHaveBeenIgnored! :challenge
    - TimeToOfficiateArrived! :challenge
    - YourJudgeIgnored! :challengeId :list
    - ChallengeFailed! :challenge
    - LastChanceToOfficiateArrived WHERE IS IT



  Notification service (depends on EmailService
    and ChallengeRepository)
    - EmailSent! :notification
    - ChallengeAccepted!
    - JudgeRequested!
    - LastChanceToBeJudgeArrived
    - JudgeForgotToPlay!
    - OfficiationRequested!
    - LastChanceToOfficiateArrived!
    - ContenderParticipationRequested!
    - ContenderRejectedTheChallenge!
    - ContenderIgnoredTheChallenge!
    - LastChanceToPlayArrived!
    - ContenderForgotToPlay!
    - YourJudgeRequestHaveBeenRejected! :challengeId :judgeId
    - ContenderSucceeded!
    - ContenderFailed!
   
    