import { BehaviorSubject } from "rxjs"; // remember to install rxjs dependency
import { useCallback, useEffect, useState } from "react";
import { skip } from "rxjs/operators";

const globalSubject = new BehaviorSubject<any>({});

type SetSharedStateAction<S> = (state: S) => void;

export default function <T>(
  subject: BehaviorSubject<T> = globalSubject
): [T, SetSharedStateAction<T>] {
  const [state, setState] = useState(subject.getValue());

  useEffect(() => {
    const subscription = subject
      .pipe(skip(1))
      .subscribe((data) => setState(data));
    return () => subscription.unsubscribe();
  });

  const setStateProxy = useCallback((state: T) => subject.next(state), [
    subject,
  ]);

  return [state, setStateProxy];
}