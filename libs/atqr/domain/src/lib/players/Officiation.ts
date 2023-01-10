import { ValueObject } from '@atqr/domain';

export class Officiation extends ValueObject<Officiation> {
  constructor(
    public readonly challenge: Challenge,
    public readonly judge: User,
    public readonly contenders: Enrollment[],
    public readonly judgementStatus: JudgementStatus
  ) {
    super(Officiation, ['contenders', 'judge', 'challenge', 'judgementStatus']);
  }

  public setChallenge(value: Challenge) {
    return this.newInstanceWith({
      challenge: value,
    });
  }

  public setJudge(value: User) {
    return this.newInstanceWith({
      judge: value,
    });
  }

  public setContenders(value: Enrollment[]) {
    return this.newInstanceWith({
      contenders: value,
    });
  }

  public setJudgementStatus(value: JudgementStatus) {
    return this.newInstanceWith({
      judgementStatus: value,
    });
  }
}
