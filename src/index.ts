import {MatcherConstructor} from "./matcherConstructor";

export function match(element: any): MatcherConstructor {
    return new MatcherConstructor(element);
}