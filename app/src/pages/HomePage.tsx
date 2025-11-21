import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import CategoryGrid from "src/components/CategoryGrid";
import CircleIconButton from "src/components/CircleIconButton";
import QuestionView from "src/components/QuestionView";
import { useFetchQuestion } from "src/hooks/useFetchQuestion";

/**
 * Main page displaying the app logo, question view, and navigation button.
 * Manages the trigger state for fetching new questions.
 */

export default function HomePage() {
    const [newQuestionTrigger, setNewQuestionTrigger] = useState(false);

    const {
        toggles,
        setToggles,
        questionText,
        isLoading,
        error,
        fetchRandom,
        fetchSimilar,
        fetchFollowUp,
    } = useFetchQuestion();

    const onNewQuestionPress = () => {
        setNewQuestionTrigger(!newQuestionTrigger);
    };

    const BUTTON_SIZE = 60;

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
                questionText={questionText}
                isLoading={isLoading}
                error={error}
                refresh={fetchRandom}
            />
            <View style={styles.buttonRow}>
                <CircleIconButton
                    layoutStyle={styles.arrowButtonContainer}
                    onPress={() => fetchSimilar()}
                    size={BUTTON_SIZE}
                    iconName="slack"
                />
                <CircleIconButton
                    layoutStyle={styles.arrowButtonContainer}
                    onPress={onNewQuestionPress}
                    size={BUTTON_SIZE}
                    iconName="arrow-right"
                />
                <CircleIconButton
                    layoutStyle={styles.arrowButtonContainer}
                    onPress={() => fetchFollowUp()}
                    size={BUTTON_SIZE}
                    iconName="eye"
                />
            </View>
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
        paddingHorizontal: "6%",
    },
    buttonRow: {
        flexDirection: "row",
        gap: 15,
        margin: 20,
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
