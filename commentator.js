document.addEventListener('DOMContentLoaded', async function () {
    const instructions = await fetchInstructions("instructions/instructionPrefix.txt") +
        await fetchInstructions("instructions/instructionMain.txt") +
        await fetchInstructions("instructions/instructionSuffix.txt")
    // const instructions = await fetchInstructions("instructions/basicInstructions.txt")
    // const instructions = "I need you to make my comment more respectful by avoiding harsh words and adding emojis. The comment is:"
    // region Consts
    const textareaElement = document.getElementById('originalComment');
    const Respectify = document.getElementById('Respectify')
    const result = document.getElementById('result')

    // TODO add your API_KEY here (don't share it with anyone - this is just for private use)
    const API_KEY = ''
    // endregion

    // region Functions
    function updateTextareaSize() {
        console.log("updateTextareaSize called")
        textareaElement.style.height = 'auto'; // Reset height to auto
        textareaElement.style.height = (textareaElement.scrollHeight) + 'px'; // Set to the scroll height
    }

    function updateResultTextareaSize() {
        console.log("updateTextareaSize called")
        result.style.height = 'auto'; // Reset height to auto
        result.style.height = (result.scrollHeight) + 'px'; // Set to the scroll height
    }

    async function fetchInstructions(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch the file. Status: ${response.status}`);
            }
            const fileContents = await response.text();
            console.log(fileContents)
            return fileContents;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function OpenaiFetchAPI() {
        console.log(`Calling GPT3 with instructions: ${instructions}`)
        var url = 'https://api.openai.com/v1/chat/completions';
        var bearer = `Bearer ${API_KEY}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": `${instructions} ${textareaElement.value}`}],
                "temperature": 0.7

            })


        })
        try {
            const res_json = await response.json();
            console.log(res_json)
            const res = await res_json['choices'][0]['message']['content']
            console.log(res)
            return res

        } catch (e) {
            console.log('Something bad happened ' + e)
        }
    }

    // endregion

    // region Script
    textareaElement.addEventListener('input', updateTextareaSize);

    // Call the function initially to set the textarea size
    updateTextareaSize();

    Respectify.addEventListener('click', async () => {
        console.log("clicked Respectify")
        const resultText = await OpenaiFetchAPI()
        console.log(`resultText is ${resultText}`)
        result.innerHTML = `Respectified:\n${resultText}`
        updateResultTextareaSize()
    });

    // endregion
});













