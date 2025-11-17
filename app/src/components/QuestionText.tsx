import { StyleSheet, Text, View } from "react-native";

/**
 * Displays question text with consistent typography and styling.
 */

type Props = {
    text: string;
};

export default function QuestionText({ text }: Props) {
    return (
        <View>
            <Text style={styles.questionText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    questionText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 32,
        lineHeight: 45,
        textAlign: "center",
    },
});
