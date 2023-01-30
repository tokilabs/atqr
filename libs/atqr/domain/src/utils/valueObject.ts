import * as hash from 'object-hash';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
const ConstructorParams = Symbol.for('plow:ValueObject.ConstructorParams');
const Constructor = Symbol.for('plow:ValueObject.Constructor');

/**
 * Base class for ValueObject's
 *
 * A value object is an object whose identity is
 * determined by it's properties values.
 *
 * Value objects MUST:
 * - Be immutable
 * - Be compared by value-equality
 * @export
 * @class ValueObject
 */
export class ValueObject<TObject> {
  /**
   * If you want to exclude some properties
   * from identity comparison, add them here.
   */
  protected excludeFromEquals: (keyof TObject)[] = [];
  protected _hash: string;

  /**
   * @param construct Your value object's constructor
   * @param constructParams Name of the properties to pass to constructor IN ORDER
   */
  constructor(
    private construct: new (...args: any[]) => TObject,
    constructParams: (keyof TObject)[]
  ) {
    this[Constructor] = construct;
    this[ConstructorParams] = constructParams;
  }

  public equals(other: ValueObject<TObject>): boolean {
    return !Object.keys(this).some((prop) => {
      // Code below should return TRUE
      // when properties DO NOT match

      // skip excluded props
      if (this.excludeFromEquals.includes(prop as keyof TObject)) {
        return false;
      }

      if (typeof this[prop].equals === 'function') {
        return !this[prop].equals(other[prop]);
      }

      return this[prop] !== other[prop];
    });
  }

  protected newInstanceWith(updatedProps: Partial<TObject>): TObject {
    const newInstance = new this[Constructor](
      ...(<any[]>this[ConstructorParams]).map((p) =>
        updatedProps.hasOwnProperty(p) ? updatedProps[p] : (<any>this)[p]
      )
    );
    newInstance.hash();
    return newInstance;
  }

  public hash() {
    this._hash = hash(this as ValueObject<TObject>, {
      algorithm: 'md5',
      excludeKeys: (key: string) =>
        this.excludeFromEquals.includes(key as keyof TObject),
    });

    return this._hash;
  }

  protected hashEquals(other: ValueObject<TObject>) {
    if (!this._hash) {
      this.hash();
    }

    if (!other._hash) {
      this.hash();
    }

    return this._hash === other._hash;
  }
}
