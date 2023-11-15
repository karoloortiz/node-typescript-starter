// Mix-ins definitions
export type AnyMixinFunction<A = any> = (
  typeToApplyMixinTo: AnyConstructor<any>
) => A;
export type AnyConstructor<A = {}> = new (...args: any[]) => A;
export type Mixin<T extends AnyMixinFunction> = InstanceType<ReturnType<T>>;

type GetProps<TBase> = TBase extends new (props: infer P) => any ? P : never;
type GetInstance<TBase> = TBase extends new (...args: any[]) => infer I
  ? I
  : never;
type MergeCtor<A, B> = new (
  props: GetProps<A> & GetProps<B>
) => GetInstance<A> & GetInstance<B>;

type MixinCreatorCallback<A, T extends AnyConstructor<A>> = (
  base: T
) => AnyConstructor<InstanceType<typeof base>>;

export function createMixinFunction<
  TBase extends AnyConstructor<any>,
  MixinCreatorCallbackT extends MixinCreatorCallback<
    TBase,
    TBase
  > = MixinCreatorCallback<TBase, TBase>
>(
  func: MixinCreatorCallbackT
): <TBase1 extends TBase>(
  Base: TBase1
) => MergeCtor<ReturnType<typeof func>, TBase1> {
  function mixinFunction(Base: TBase) {
    const Derived = func(Base as any);
    return Derived as MergeCtor<ReturnType<typeof func>, typeof Base>;
  }

  return mixinFunction;
}
