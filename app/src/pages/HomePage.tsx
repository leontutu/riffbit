import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import ArrowButton from "src/components/ArrowButton";
import CategoryGrid from "src/components/CategoryGrid";
import QuestionView from "src/components/QuestionView";
import { useRandomQuestion } from "src/hooks/useQuestionsApi";

/**
 * Main page displaying the app logo, question view, and navigation button.
 * Manages the trigger state for fetching new questions.
 */

export default function HomePage() {
    const [newQuestionTrigger, setNewQuestionTrigger] = useState(false);

    const { toggles, setToggles, question, isLoading, error, refresh } = useRandomQuestion();

    const onNewQuestionPress = () => {
        setNewQuestionTrigger(!newQuestionTrigger);
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require("../../assets/logo.png")}
                resizeMode="contain"
            />
            <QuestionView
                layoutStyle={styles.questionViewContainer}
                newQuestionTrigger={newQuestionTrigger}
                questionText={question?.text}
                isLoading={isLoading}
                error={error}
                refresh={refresh}
            />
            <ArrowButton
                layoutStyle={styles.arrowButtonContainer}
                onPress={onNewQuestionPress}
                size={90}
            />
            <CategoryGrid
                layoutStyle={styles.categoryGridContainer}
                toggles={toggles}
                setToggles={setToggles}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
    },
    image: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: 50,
    },
    questionViewContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "5%",
    },
    arrowButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    categoryGridContainer: {
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        paddingBottom: 20,
    },
});
