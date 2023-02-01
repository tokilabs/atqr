Events emitted in DISL followed by their required parameters:

----------------------------
  Goal Aggregate root (depends on Challenge Repository):
    - GoalCreated! (goal: Goal)
    - ChargeAuthorized! (owner: Contact, pledge: number, ownerPaymentMethod: PaymentMethod)
    - ChallengeCreated!


----------------------------
  Challenge Aggregate root (depends on Payment Service):
    - FundsAvailable! (ChallengeId: ChallengeId, paymentMethod: PaymentMethod)
    - FundsDenied! (ChallengeId: ChallengeId)
    - ChallengeCanceled!
    - ChallengeGotANewInvitee! (challenge: Challenge, invitee: Invitee)
    - ContenderRemovedJudge! (judgeEmail)

----------------------------
    User entity:
      - UserCreated! (userId: UserId)

----------------------------
    PaymentMethod entity:
      - 📧 CardCharged! (auth, amountInCents) //TODO: should this one be in here?
      - CardChargeFailed! (auth, amountInCents) 
  

  ----------------------------
  DeadlineMonitor service (Depends on ChallengesService)
    - DeadlineReached! (ChallengeId: ChallengeId)
    - ReminderToPlay! (ChallengeId: ChallengeId, list: Invitee[]: Invitee[])
    - LastChanceToPlay! (ChallengeId: ChallengeId, list: Invitee[])
    - YourContenderIgnoredTheChallenge! (challenge: Challenge)
    - YourOfficiationRequestHaveBeenIgnored! (challenge: Challenge)
    - TimeToOfficiateArrived! (challenge: Challenge)
    - YourJudgeIgnored! (ChallengeId: ChallengeId, list: Invitee[])
    - ChallengeFailed! (challenge: Challenge)

      //TODO: these 2 below are missing
    - LastChanceToOfficiateArrived!
    - ChallengeIgnored!


----------------------------
  Notification service (depends on EmailService
    and ChallengeRepository)
    - EmailSent! (notification: Notification)
    - ChallengeAccepted!
    - JudgeRequested!
    - JudgeForgotToPlay!
    - OfficiationRequested!
    - ContenderParticipationRequested!
    - ContenderIgnoredTheChallenge!
    - LastChanceToPlayArrived!
    - ContenderForgotToPlay!