import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import ArrowButton from "src/components/ArrowButton";
import QuestionView from "src/components/QuestionView";

export default function HomePage() {
    const [newQuestionTrigger, setNewQuestionTrigger] = useState(false);

    const onNewQuestionPress = () => {
        setNewQuestionTrigger(!newQuestionTrigger);
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require("../../assets/logo.png") as number} />
            </View>
            <QuestionView newQuestionTrigger={newQuestionTrigger} />
            <View style={styles.arrowButtonContainer}>
                <ArrowButton onPress={onNewQuestionPress} />
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
        width: "50%",
    },
});
