/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
const ConstructorParams = Symbol.for('plow:ValueObject.ConstructorParams');
const Constructor = Symbol.for('plow:ValueObject.Constructor');

/**
 * Base class for ValueObject's
 *
 * How to extend this class:
 * 
 *  1. Declare all properties in the Constructor
 *      They must all be `public readonly`
 *  2. Call super passing the arguments:
 *      - The instance type of the class you are creating
 *      - An array of string with the names of the constructor parameters in the same order the constructor receives them
 *  3. Create a `setPROP` for each property of your Value Object
 *      - Replace PROP is the name of the function by the property name
 *      - Use the base class' {@link newInstanceWith } method to create new instances without boilerplate
 * 
 * @example
 * 
 * <code>
 *  class SomeVO extends ValueObject<SomeVO> {
 *    constructor(
 *      public readonly propA: string,
 *      public readonly propB: number,
 *      public readonly propC: boolean) {
 *        super(
 *          SomeVO, [
 *            "propA",
 *            "propB",
 *            "propC"
 *          ]
 *        );
 *    }
 * 
 *    // Set Methods
 * 
 *    ...other set methods
 * 
 *    public setPropB(propB: number) {
 *      return this.newInstanceWith({
 *        propB
 *      });
 *    }
 *    ...other set methods
 *  }
 * </code>
 * 
 * @remarks
 * A value object is an object whose identity is
 * determined by it's properties values.
 *
 * To achieve that, Value Objects MUST:
 * - Be immutable
 * - Be compared by value-equality
 * 
 * @export
 * @class ValueObject
 */
export abstract class ValueObject<TObject> {
  /**
   * See class documentation for a "how to" on extending 
   * this class
   * 
   * @param construct Your Value Object's instance type
   * @param constructParams Name of the parameters passed to your  value object's constructor IN ORDER
   */
  constructor(
    private construct: new (...args: any[]) => TObject,
    constructParams:  (keyof TObject)[]
  ) {
    this[Constructor] = construct;
    this[ConstructorParams] = constructParams;
  }

  public equals(other: ValueObject<TObject>): boolean {
    return !Object.keys(this).some((prop) => {
      // return true if prop is different
      if (typeof this[prop].equals === 'function') {
        return !this[prop].equals(other[prop]);
      }

      return this[prop] !== other[prop];
    });
  }

  protected newInstanceWith(updatedProps: Partial<TObject>): TObject {
    return new this[Constructor](
      ...(<any[]>this[ConstructorParams]).map((p) =>
        updatedProps.hasOwnProperty(p) ? updatedProps[p] : (<any>this)[p]
      )
    );
  }
}
