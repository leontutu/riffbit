import { StyleSheet, Text, View } from "react-native";

/**
 * Displays question text with consistent typography and styling.
 */

type Props = {
    text: string;
};

export default function QuestionText({ text }: Props) {
    const [dynamicFontSize, dynamicLineHeight] = getDynamicTextStyles(text);

    return (
        <View>
            <Text
                style={[
                    styles.questionText,
                    { fontSize: dynamicFontSize, lineHeight: dynamicLineHeight },
                ]}
            >
                {text}
            </Text>
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

function getDynamicTextStyles(text: string): [number, number] {
    const LINE_HEIGHT_RATIO = 1.4;

    let fontSize: number;
    if (text.length > 160) {
        fontSize = 20;
    } else if (text.length > 140) {
        fontSize = 24;
    } else if (text.length > 120) {
        fontSize = 26;
    } else if (text.length > 100) {
        fontSize = 28;
    } else if (text.length > 80) {
        fontSize = 30;
    } else {
        fontSize = 32;
    }

    return [fontSize, fontSize * LINE_HEIGHT_RATIO];
}
