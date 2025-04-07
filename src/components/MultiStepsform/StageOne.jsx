'use client'

import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";

const StageOne = ({ finalFormData, formConfig, next, back, setFormData }) => {
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Check if all required questions are answered
    useEffect(() => {
        if (formConfig) {
            const requiredQuestions = formConfig.questions.filter(q => q.required);
            const allAnswered = requiredQuestions.every(q => answers[q.fieldName]);
            setAllQuestionsAnswered(allAnswered);
        }
    }, [answers, formConfig]);

    const handleAnswerChange = (fieldName, value) => {
        setAnswers((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < formConfig.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Object.entries(answers).forEach(([key, value]) => {
            finalFormData.append(key, typeof value === "string" ? value : JSON.stringify(value));
        });
        setFormData(answers);
        setFormSubmitted(true);
    };

    if (!formConfig) {
        return <div className="text-center">Loading...</div>;
    }

    const { questions } = formConfig;
    const currentQuestion = questions[currentQuestionIndex];
    const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-6">
            <Card className="shadow-lg overflow-hidden border border-gray-100">
                <CardHeader className="bg-[#00725A] p-4">
                    <h2 className="text-lg md:text-xl font-semibold text-white">
                        {currentQuestion.questionText}
                    </h2>
                </CardHeader>
                <CardContent className="p-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Current question */}
                        <div key={currentQuestion.fieldName} className="space-y-3">
                            <div className="flex flex-col space-y-3">
                                {currentQuestion.fieldType === "radio" && (
                                    <RadioGroup
                                        value={answers[currentQuestion.fieldName] || ""}
                                        onValueChange={(value) => handleAnswerChange(currentQuestion.fieldName, value)}
                                        className="space-y-2"
                                    >
                                        {currentQuestion.options.map((option, index) => (
                                            <Label
                                                key={index}
                                                htmlFor={`${currentQuestion.fieldName}-${index}`}
                                                className={`flex items-center space-x-3 p-3 border rounded-md transition-all cursor-pointer ${answers[currentQuestion.fieldName] === option
                                                    ? 'bg-[#00725A]/10 border-[#00725A] ring-1 ring-[#00725A]/20'
                                                    : 'bg-white border-gray-200 hover:bg-[#00725A]/5 hover:border-[#00725A]/30'
                                                    }`}
                                            >
                                                <RadioGroupItem
                                                    value={option}
                                                    id={`${currentQuestion.fieldName}-${index}`}
                                                    className="sr-only"
                                                />
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers[currentQuestion.fieldName] === option
                                                    ? 'border-[#00725A] bg-[#00725A]'
                                                    : 'border-gray-300'
                                                    }`}>
                                                    {answers[currentQuestion.fieldName] === option && (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-800">{option}</span>
                                            </Label>
                                        ))}
                                    </RadioGroup>
                                )}

                                {currentQuestion.fieldType === "text" && (
                                    <Input
                                        type="text"
                                        id={currentQuestion.fieldName}
                                        name={currentQuestion.fieldName}
                                        placeholder={currentQuestion.placeholder}
                                        value={answers[currentQuestion.fieldName] || ""}
                                        onChange={(e) => handleAnswerChange(currentQuestion.fieldName, e.target.value)}
                                        className="w-full p-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#00725A] focus:border-transparent"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-between pt-3">
                            <Button
                                type="button"
                                onClick={currentQuestionIndex === 0 ? back : handlePrevQuestion}
                                variant="outline"
                                className="px-4 py-2 text-sm border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={currentQuestionIndex === 0}
                            >
                                Back
                            </Button>

                            {!isLastQuestion ? (
                                <Button
                                    type="button"
                                    onClick={handleNextQuestion}
                                    disabled={!answers[currentQuestion.fieldName] && currentQuestion.required}
                                    className="px-4 py-2 text-sm bg-[#00725A] hover:bg-[#00634A] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    disabled={!allQuestionsAnswered}
                                    className="px-4 py-2 text-sm bg-[#00725A] hover:bg-[#00634A] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Submit Answers
                                </Button>
                            )}
                        </div>
                    </form>

                    {/* Main Next button appears after form submission */}
                    {formSubmitted && (
                        <div className="mt-6 flex justify-end">
                            <Button
                                onClick={next}
                                className="px-6 py-3 text-sm bg-[#00725A] hover:bg-[#00634A] text-white"
                            >
                                Continue to Next Step
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Question indicator dots */}
            <div className="flex justify-center mt-4 space-x-1.5">
                {questions.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentQuestionIndex
                            ? 'bg-[#00725A]'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to question ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default StageOne;