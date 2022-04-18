import type { ComponentObjectPropsOptions, Prop, PropType } from 'vue';

// This code is mostly a copy of Vuetify's propsFactory method
// https://github.com/vuetifyjs/vuetify/blob/50988eff6a090a96c412e4d98a08c6c0888fb386/packages/vuetify/src/util/propsFactory.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
export function propsFactory<
  PropsOptions extends ComponentObjectPropsOptions
>(props: PropsOptions) {
  return <Defaults extends PartialKeys<PropsOptions> = Record<string, unknown>>(
    defaults?: Defaults,
  ): AppendDefault<PropsOptions, Defaults> => Object.keys(props).reduce<any>((obj, prop) => {
    const isObjectDefinition = (typeof props[prop] === 'object') && (props[prop] != null) && !Array.isArray(props[prop]);
    const definition = isObjectDefinition ? props[prop] : { type: props[prop] };

    /* eslint-disable no-param-reassign */
    if (defaults && prop in defaults) {
      obj[prop] = {
        ...definition,
        default: defaults[prop],
      };
    } else {
      obj[prop] = definition;
    }
    /* eslint-enable no-param-reassign */

    return obj;
  }, {});
}

type AppendDefault<T extends ComponentObjectPropsOptions, D extends PartialKeys<T>> = {
  [P in keyof T]-?: unknown extends D[P]
    ? T[P]
    : T[P] extends Record<string, unknown>
      ? Omit<T[P], 'type' | 'default'> & {
        type: PropType<MergeDefault<T[P], D[P]>>
        default: MergeDefault<T[P], D[P]>
      }
      : {
        type: PropType<MergeDefault<T[P], D[P]>>
        default: MergeDefault<T[P], D[P]>
      }
}

type MergeDefault<T, D> = unknown extends D ? InferPropType<T> : (NonNullable<InferPropType<T>> | D)

/**
 * Like `Partial<T>` but doesn't care what the value is
 */
type PartialKeys<T> = { [P in keyof T]?: unknown }

// Copied from Vue
type InferPropType<T> = T extends null
  ? any // null & true would fail to infer
  : T extends { type: null | true }
    ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
    : T extends ObjectConstructor | { type: ObjectConstructor }
      ? Record<string, any>
      : T extends BooleanConstructor | { type: BooleanConstructor }
        ? boolean
        : T extends Prop<infer V, infer D> ? (unknown extends V ? D : V) : T

/* eslint-enable @typescript-eslint/no-explicit-any */
