import {MatcherConstructor} from "./matcherConstructor";

export function match<E>(element: E): MatcherConstructor<E> {
    return new MatcherConstructor(element);
}