// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));
