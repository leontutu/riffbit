import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import ArrowButton from "src/components/ArrowButton";
import QuestionView from "src/components/QuestionView";

/**
 * Main page displaying the app logo, question view, and navigation button.
 * Manages the trigger state for fetching new questions.
 */

export default function HomePage() {
    const [newQuestionTrigger, setNewQuestionTrigger] = useState(false);

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
            />
            <ArrowButton layoutStyle={styles.arrowButtonContainer} onPress={onNewQuestionPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
    },
    arrowButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    // },
    image: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: 50,
    },
    questionViewContainer: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "5%",
    },
});
