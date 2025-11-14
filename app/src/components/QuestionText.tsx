import { StyleSheet, Text, View } from "react-native";

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
        fontFamily: "JejuMyeongjo",
        fontSize: 34,
        textAlign: "center",
    },
});
