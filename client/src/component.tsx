import { useMutation, useQuery } from "urql";
import { graphql } from "./gql/gql";

type OrNever<T> = 0 extends 1 & T ? never : T;

type TestAny = OrNever<any> | 4;

type TestUnresolved = OrNever<A> | 4;

type OrNeverFixed<T> = void extends T ? never: T;

type TestAny2 = OrNeverFixed<any> | 4;

type TestUnresolved2 = OrNeverFixed<A> | 4;


const GetItems = graphql(`
    query GetItems {
        items {
            id
            name
        }
    }
`);

const UpdateItem = graphql(`
    mutation UpdateItem {
        updateItem {
            id
            name
        }
    }
`);

export function Items() {
	const [queryResult] = useQuery({
		query: GetItems,
	});
	const items = queryResult.data?.items;

	const [mutationResult] = useMutation(UpdateItem);

	const item = mutationResult.data?.updateItem;

	return <div>Items</div>;
}
