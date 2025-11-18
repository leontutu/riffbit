import { useEffect, useRef } from "react";
import { Animated, Dimensions, Text } from "react-native";

import { useRandomQuestion } from "src/hooks/useQuestionsApi";

import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";
import QuestionText from "./QuestionText";

/**
 * Manages question display with slide-in animations and loading/error states.
 * Fetches random questions from the API and animates transitions between questions.
 */

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Props = {
    newQuestionTrigger: boolean;
    layoutStyle?: object;
};

export default function QuestionView({ newQuestionTrigger, layoutStyle }: Props) {
    const { question, isLoading, error, refresh } = useRandomQuestion();

    const isInitialMount = useRef(true);
    const isIntroText = useRef(true);
    const translateX = useRef(new Animated.Value(0)).current;

    const renderQuestion = () => {
        if (isIntroText.current)
            return (
                <QuestionText
                    text={"Welcome to RiffBit!\nPress the arrow button to get started!"}
                />
            );
        if (isLoading) return <LoadingView />;
        if (error) return <ErrorView errorMessage={error} />;
        if (question) return <QuestionText text={`"${question.text}"`} />;
        return <Text>Something went critically wrong</Text>;
    };

    useEffect(() => {
        if (isInitialMount.current) return;

        isIntroText.current = false;
        if (!isLoading) {
            translateX.setValue(SCREEN_WIDTH);

            Animated.timing(translateX, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [isLoading]);

    const animatedStyle = {
        transform: [{ translateX: translateX }],
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        Animated.timing(translateX, {
            toValue: -SCREEN_WIDTH,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            refresh();
        });
    }, [newQuestionTrigger]);

    return <Animated.View style={[layoutStyle, animatedStyle]}>{renderQuestion()}</Animated.View>;
}
