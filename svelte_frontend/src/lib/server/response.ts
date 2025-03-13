import { error } from '@sveltejs/kit';
import { DEFAULT_FETCH_OPTIONS, type FetchOptions, opts } from './request';
import { EMPTY_STATUS } from '$lib/defaults/status';

type HandleResponse<T, U, O extends boolean> = O extends true
	? T // If onlyOk is true, return type is T
	: T | U | undefined; // If onlyOk is false, return type is T | U | undefined

/*
 * Handle the response from a fetch request
 * @param response - The response object from a fetch request
 * @param optionsOrVerb - The options or verb to be used in the fetch request
 * @param onlyOk - If true, only return the ok response json, else return undefined instead error data
 */
export const resp = async <T, U, O extends boolean>(
	response: PyResponse<T, U> | undefined,
	optionsOrAction: Partial<FetchOptions> | string = DEFAULT_FETCH_OPTIONS,
	onlyOk: O = false as O // Default to false, with type assertion
): Promise<HandleResponse<T, U, O> | undefined> => {
	// Allow undefined as a return type
	if (!response) {
		return; // Explicitly return undefined if no response is provided
	}

	try {
		// Check if the response status is within the empty status list
		if (EMPTY_STATUS.includes(response.status)) {
			return; // Explicitly return undefined if status is considered "empty"
		}

		// Await and return the JSON response with proper typing
		if (onlyOk && response.ok) {
			// Only return the ok response
			return (await response.json()) as HandleResponse<T, U, O>; // Return T
		} else if (!onlyOk) {
			// Could be both, ok or bad response
			return (await response.json()) as HandleResponse<T, U, O>; // Return T | U
		}
	} catch (e) {
		const options = opts(optionsOrAction);
		console.error(`Response error fetching data for \`${options.actionName}\`: `, e);

		// Throw an error if options.raiseError is set to true
		if (options.raiseError) {
			error(options.statusCode || 500, `Error displaying: \`${options.actionName}\`.`);
		}
	}

	return; // Ensure undefined is returned in case of error
};
