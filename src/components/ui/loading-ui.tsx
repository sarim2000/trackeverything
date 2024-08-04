import { Flex, Loader } from "@mantine/core";

export default function LoadingUI() {
    return <Flex justify="center">
        <Loader type="dots" />
    </Flex>;
}