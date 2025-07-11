import { createEvent, createStore } from "effector";

// STORES
export const $error = createStore<Error | string>("");

// EVENTS
export const errorUpdated = createEvent<Error | string>();
export const errorReset = createEvent();

$error.on(errorUpdated, (_, newError) => newError);
$error.on(errorReset, () => "");
