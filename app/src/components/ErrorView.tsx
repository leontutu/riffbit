import { StyleSheet, Text, View } from "react-native";

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
            <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    errorText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 32,
        lineHeight: 45,
        textAlign: "center",
    },
});
