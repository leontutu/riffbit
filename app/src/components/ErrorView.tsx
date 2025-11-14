import { Text, View } from "react-native";

/**
 * Displays error messages when question fetching fails.
 * Currently minimal; will be enhanced with styling.
 */

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
