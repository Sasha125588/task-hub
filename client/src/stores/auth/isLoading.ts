import { createEvent, createStore } from "effector";

// STORES
export const $isLoading = createStore<boolean>(false);

// EVENTS
export const loadingUpdated = createEvent<boolean>();
export const loadingReset = createEvent();

$isLoading.on(loadingUpdated, (_, newIsLoading) => newIsLoading);
$isLoading.on(loadingReset, () => false);
