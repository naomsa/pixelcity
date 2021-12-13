export interface Token {
	name: string;
	description: string;
	image: string;
	attributes?: Attribute[];
}

interface Attribute {
	trait_type: string;
	value: string;
}
