# react-native-simple-survey

## TOC
[Changes](#changes)

[About](#about)

[Usage](#usage)

[Props](#props)

[Callbacks](#callbacks)

[Screenshots](#screenshot)

## Changes
1.2.0 - MultipleSelectionGroup is now supported. Documentation will come soon, example code is up to date!

## About
react-native-simple-survey is a super simple way to ask your user questions. Give it some JSON with questions and some callbacks to draw the UI and Simple Survey handles all state management for you, runs the user through your questions, and pops answers out at the end.

## Usage

Feed it JSON such as

````js
const survey = [
    {
        questionType: 'Info',
        questionText: 'Welcome to the React Native Simple Survey Example app! Tap next to continue'
    },
    {
        questionType: 'TextInput',
        questionText: 'Simple Survey supports free form text input',
        questionId: 'favoriteColor',
        placeholderText: 'Tell me your favorite color!',
    },
    {
        questionType: 'NumericInput',
        questionText: 'It also supports numeric input. Enter your favorite number here!',
        questionId: 'favoriteNumber',
        placeholderText: '',
    },
    {
        questionType: 'SelectionGroup',
        questionText: 'Simple Survey also has multiple choice questions. What is your favorite pet?',
        questionId: 'favoritePet',
        options: [
            {
                optionText: 'Dogs',
                value: 'dog'
            },
            {
                optionText: 'Cats',
                value: 'cat'
            },
            {
                optionText: 'Ferrets',
                value: 'ferret'
            },
        ]
    },
];
````

Then use the component like this:

````JSX
<SimpleSurvey
    survey={survey}
    containerStyle={styles.surveyContainer}
    selectionGroupContainerStyle={styles.selectionGroupContainer}
    navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
    renderPrevious={this.renderPreviousButton.bind(this)}
    renderNext={this.renderNextButton.bind(this)}
    renderFinished={this.renderFinishedButton.bind(this)}
    renderQuestionText={this.renderQuestionText}
    renderSelector={this.renderButton.bind(this)}
    onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
    onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
    renderTextInput={this.renderTextBox}
    renderNumericInput={this.renderNumericInput}
    renderInfo={this.renderInfoText}
/>
````

## Props

The below looks like a lot. To get started, you can copy/paste from the ExampleApp and change the styling. Swap out the default RN UI components for your own or for the ones in your favorite UI toolkit. 

|Prop|Description|
|----|-----------|
|survey| JSON formatted as show in [Usage](#usage) all valid fields are show in the example|
|renderSelector| Returns a component that is used to render the UI for multiple choice questions. Should be a UI component that supports single selection, such as a button or radio button. Other creative element types are also possible.|
|containerStyle| Style object for the the SimpleSurvey's wrapping view|
|selectionGroupContainerStyle|Style for the view that will wrap the selection group options, as rendered by renderSelector.|
|navButtonContainerStyle|Wrapping view for the navigation buttons, previous, next, and finished. If not passed in, nav buttons will be wrapped by regular a View with no styling.|
|renderPrevious| Function that returns a component following the specifications as laid out in the [Callbacks](#callbacks) section.|
|renderNext| Function that returns a component following the specifications as laid out in the [Callbacks](#callbacks) section.|
|renderFinished| Function that returns a component following the specifications as laid out in the [Callbacks](#callbacks) section.|
|renderQuestionText| Function that returns a component following the specifications as laid out in the [Callbacks](#callbacks) section. Basically a ````<Text>```` element|
|onSurveyFinished| This function receives answers the user typed in as a parameter answers, see the [Callbacks](#callbacks) section. |
|onAnswerSubmitted| This function is called everytime the user navigates to the next screen, see the [Callbacks](#callbacks) section. |
|renderTextInput| Returns the component used for user text input, see the [Callbacks](#callbacks) section.|
|renderNumericInput| Returns the component used for numeric input, see the [Callbacks](#callbacks) section.|
|renderInfo| Returns the component used to render info screens, see the [Callbacks](#callbacks) section.|
  
Props that you don't use are always optional. e.g. if you don't have numeric questions, no need to pass in renderNumericInput. Corrolary of this is that SimpleSurvey will throw exceptions if you do pass in a ````questionType: 'NumericInput'```` without having defined renderNumericInput.

## Callbacks

The majority of callbacks will return a component that Simple Survey then renders for you. This means you completely customize how Simple Survey looks. You don't even have to use buttons for your UI, Simple Survey handles the state management and lets you do render whatever you want. 

````onSurveyFinished```` and ````onAnswerSubmitted```` are the only callbacks that don't return a component.

### Navigation Callbacks 
The props ````renderPrevious````, ````renderNext````, ````renderFinished```` all have the same form.

|Parameter|Description|
|---------|-----------|
|onPress|Must be called when this component is activiated (tapped, swiped, clicked, etc)|
|enabled|Boolean indicating if this component should be enabled.|


The onPress equivalent (feel free to have fun, so long as the user indicates something) has to call the ````onPress```` lambda that is passed in. At its most boring this looks like 

````JSX
const renderNext = (onPress, enabled) => {
  return(<Button
    color={GREEN}
    onPress={onPress}
    disabled={!enabled}
    backgroundColor={GREEN}
    title={'Next'}
  />);
}
````

enabled tells you if the button should be enabled or not.

### renderQuestionText
Must returns a component. This is the text shown above above each question.

|Parameter|Description|
|---------|-----------|
|questionText|Text of the question as specified in the JSON for this question.|

Sample usage

````JSX
const renderQuestionText = (questionText) => {
    return (<Text>{questionText}</Text>); 
}
````

### renderSelector
Must return a component. This is the UI element that will be shown for each option of a SelectionGroup. Buttons, radio buttons, sliders, whatever you want, so long as onPress gets called when the user has selected something.

|Variable|Description|
|--------|-----|
|data|A complete copy of the 'value' field defined in the JSON object for this SelectionGroup. See example below.|
|index| Index of this option in the array of ````options```` that was passed to the SelectionGroup. Useful as key on your component.|
|isSelected| Indicates if the user has selected this option. |
|onPress| Must be called when the user has selected this component as their choice.|

Sample usage

````JSX
const renderSelector = (data, index, isSelected, onPress) => {
  return (<Button
      title={data.optionText}
      onPress={onPress}
      color={isSelected ? GREEN : PURPLE}
      key={`button_${index}`}
  />);
}
````

### onSurveyFinished
Called after the user activates the component passed in to ````renderFinished````

|Parameter|Description|
|---------|-----------|
|answers|Array of JSON values as described below.|

This is passed a JSON array of the form

````
[
{questionId: string, value: any},
{questionId: string, value: any},
// ...
]
````

where value is the answer the user selected or entered. Selection Group is more flexible, value is the entirity of the object passed into ````option````, meaning Selection Group questions can actually do some pretty fun stuff. An example of this

````JS
{ 
  questionId: "favoritePet", 
  value: { 
    optionText: "Dogs",
    value: "dog"
  }
}
````        

Navigation to leave or close out SimpleSurvey should go here.

It is highly recommended that you do something like ````const infoQuestionsRemoved = [...answers];```` to remove Info elements from the array.

### onQuestionAnswered
Called after the user activitates the ````renderNext```` component.

|Parameter|Description|
|---------|-----------|
|answers|Of type string or Object, see description below|

answer is the user's input for Numeric and Text input, it is the entire Option object for SelectionGroup. As an example, from the sample JSON up above, if the user selected Dogs, onQuestionAnswered would receive

````JS
{ 
  optionText: "Dogs",
  value: "dog"
}
````

### renderTextInput
Must return a component. Renders input component for questions of type TextInput.

|Parameter|Description|
|---------|-----------|
|onChange|Must be called for every character input by the user|
|placeHolder| Placeholder text as indicated in the JSON, may be blank if not specified in the JSON|
|value|Current value of this field|

Example:

````JSX
const renderTextInput = (onChange, placeholder, value) {
  return (<TextInput
    onChangeText={text => onChange(text)}
    placeholder={placeholder}
    value={value}
  />);
}
````

See the ExampleApp for a better styled, more functional, example.

### renderNumericInput
Must return a component. Renders input component for questions of type NumericInput. 

|Parameter|Description|
|---------|-----------|
|onChange|Must be called for every character input by the user|
|value|Current value of this field|

Example:

````JSX
const renderNumericInput = (onChange, value) {
  return (<TextInput 
    style={styles.numericInput}
    onChangeText={text => { onChange(text); }}
    underlineColorAndroid={'white'}
    placeholderTextColor={'rgba(184,184,184,1)'}
    value={String(value)}
    keyboardType={'numeric'}
    maxLength={3}
  />);
}
````

### renderInfo
Must return a component. Renders text on questionType: 'Info' Screens.

|Parameter|Description|
|---------|-----------|
|infoText|String as passed in the JSON field questionText for questionType: "Info"|

Example:

````JSX
const renderInfoText = (infoText) {
  return (<Text style={styles.infoText}>{infoText}</Text>);
}
````


## Screenshot
![image](https://user-images.githubusercontent.com/11895351/53525490-c1a78f00-3a96-11e9-9291-f7c65b27f184.png)
