import { Text, View } from "react-native";

type Props = {
    errorMessage: string;
};

export default function ErrorView({ errorMessage }: Props) {
    return (
        <View>
            <Text>{errorMessage}</Text>
        </View>
    );
}
