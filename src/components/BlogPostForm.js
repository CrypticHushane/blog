import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const BlogPostForm = ({ onSubmit, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <Text style={styles.label}>Enter Content:</Text>
            <TextInput
                style={styles.input}
                value={content}
                onChangeText={(text) => setContent(text)}
            />
            <Button
                title="Save Blog Post"
                onPress={() => onSubmit(title, content)}
            />
        </View>
    );
};

BlogPostForm.defaultProps = {
    initialValues: {
        title: "",
        content: "",
    },
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 20,
    },
    input: {
        margin: 15,
        fontSize: 18,
        borderColor: "black",
        borderWidth: 0.5,
        alignSelf: "stretch",
        padding: 6,
    },
    label: {
        fontSize: 25,
        margin: 5,
    },
    button: {
        fontSize: 20,
        margin: 15,
        color: "black",
    },
});

export default BlogPostForm;
