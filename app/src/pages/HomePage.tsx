import { Image, StyleSheet, Text, View } from "react-native";

import ArrowButton from "src/components/ArrowButton";
import ErrorView from "src/components/ErrorView";
import LoadingView from "src/components/LoadingView";
import QuestionText from "src/components/QuestionText";
import { useRandomQuestion } from "src/hooks/useQuestionsApi";

export default function HomePage() {
    const { question, isLoading, error, refresh } = useRandomQuestion();

    const renderQuestion = () => {
        if (isLoading) return <LoadingView />;
        if (error) return <ErrorView errorMessage={error} />;
        if (question) return <QuestionText text={question.text} />;
        return <Text>Something went critically wrong</Text>;
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require("../../assets/logo.png") as number} />
            </View>
            <View style={styles.questionContainer}>{renderQuestion()}</View>
            <View style={styles.arrowButtonContainer}>
                <ArrowButton onPress={refresh} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
    },
    questionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "10%",
    },
    arrowButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        resizeMode: "contain",
        width: "70%",
    },
});
