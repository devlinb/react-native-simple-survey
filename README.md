# react-native-simple-survey

## TOC
[Changes](#changes)

[About](#about)

[Demo](#demo)

[Usage](#usage)

[Props](#props)

[Callbacks](#callbacks)

[JSON Schema](#json-schema)

[Screenshots](#screenshot)

## Changes
3.0.0 - Breaking changes to API to fix inconsistency in orders parameters were being passed into callbacks.
* **BREAKING CHANGES**
  * ```renderTextInput``` and ```renderNumericInput``` are passed ``placeholder`` as their third parameter, and ``onBlur`` as their fourth. 
    * Previously ``renderTextInput`` was taking ``placeholder`` as its second parameter.
* **New Features** 
  * ``defaultValue`` for text and numeric inputs.
  * ``getAnswers()`` on a ref to grab whatever answers have been given so far.
* documented ``onBlur`` for auto-advance of text and numeric input components
* Added type fields for parameters in readme.
* You can now pass in any object for questionText, since you have to render it anyway, have fun! 
* Updated ExampleApp to bring it in line with new features.


2.0.2 - When a default defaultSelection is set, the next and finish buttons are now properly enabled.

2.0.1 - Update README.md for NPM.

2.0   - Lots of new features!
* autoAdvance is now supported on a per question basis for ``SelectionGroup`` and ``MultipleSelectionGroup``
* By default ``SelectionGroup`` and ``MultipleSelectionGroup`` items can be deselected, there is a new ``questionSettings`` field deselectionAllowed that can disable this behavior
* ``SelectionGroup`` and ``MultipleSelectionGroup`` have a new ``questionSettings`` field ``defaultSelection``, it is a single value for ``SelectionGroup`` and an array of numbers for ``MultipleSelectionGroup``. The values in both cases are index(es) of element(s) that should be selected by default.

1.2.0 - MultipleSelectionGroup is now supported. 

## About
react-native-simple-survey is a super simple way to ask your user questions. Give it some JSON with questions and some callbacks to draw the UI and Simple Survey handles all state management for you, runs the user through your questions, and pops answers out at the end.

## Demo
See a live demo at https://snack.expo.io/@devlinb/react-native-simple-survey-example-app

## Usage

See the ExampleApp for a demonstration of all the features.

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
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Select two or three of your favorite foods!',
        questionId: 'favoriteFoods',
        questionSettings: {
            maxMultiSelect: 3,
            minMultiSelect: 2,
        },
        options: [
            {
                optionText: 'Sticky rice dumplings',
                value: 'sticky rice dumplings'
            },
            {
                optionText: 'Pad Thai',
                value: 'pad thai'
            },
            {
                optionText: 'Steak and Eggs',
                value: 'steak and eggs'
            },
            {
                optionText: 'Tofu',
                value: 'tofu'
            },
            {
                optionText: 'Ice cream!',
                value: 'ice crem'
            },
            {
                optionText: 'Injera',
                value: 'injera'
            },
            {
                optionText: 'Tamales',
                value: 'tamales'
            }
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
|survey| JSON formatted as show in [Usage](#usage) all valid fields are show in the example app, the schema is defined in [JSON Schema](#json-schema)|
|renderSelector| Returns a component that is used to render the UI for multiple choice questions. Should be a UI component that supports single selection, such as a button or radio button. Other creative element types are also possible.|
|containerStyle| Style object for the the SimpleSurvey's wrapping view|
|selectionGroupContainerStyle|Style for the view that will wrap the selection group options, as rendered by renderSelector.|
|navButtonContainerStyle|Wrapping view for the navigation buttons, previous, next, and finished. If not passed in, nav buttons will be wrapped by regular a View with no styling.|
|renderPrevious| Function that returns a component following the specifications as laid out in the [Callbacks](#callbacks) section. Most often a some type of ``<TouchableOpacity>`` or your favorite flavor of ``<Button>``|
|renderNext| Function that returns a component following the specifications as laid out in the [Callbacks](#callbacks) section.|
|renderFinished| Function that returns a component following the specifications as laid out in the [Callbacks](#callbacks) section.|
|renderQuestionText| Function that returns a component following the specifications as laid out in the [Callbacks](#callbacks) section. Typically this will return a ````<Text>```` element|
|onSurveyFinished| This function receives answers the user typed/selected as the parameter ``answers``, see the [Callbacks](#callbacks) section. |
|onAnswerSubmitted| This function is called everytime the user navigates to the next screen, see the [Callbacks](#callbacks) section. |
|renderTextInput| Function that returns the component used for user text input, see the [Callbacks](#callbacks) section.|
|renderNumericInput| Returns the component used for numeric input, see the [Callbacks](#callbacks) section.|
|renderInfo| Returns the component used to render info screens, see the [Callbacks](#callbacks) section.|
  
Props that you don't use are always optional. e.g. if you don't have numeric questions, no need to pass in renderNumericInput. Corrolary of this is that SimpleSurvey will throw exceptions if you do pass in a ````questionType: 'NumericInput'```` without having defined renderNumericInput.

## Ref Functions

|Function|Description|
|--------|-----------|
|getAnswers()|Returns JSON for all answers the user has submitted so far. ```defaultValue``` for questions the user has seen but not proceeded past will also be returned. Unanswered questions will not be present in the JSON. Info questions are filtered from the returned JSON.  |

## Callbacks

The majority of callbacks will return a component that Simple Survey then renders for you. This means you completely customize how Simple Survey looks. You don't even have to use buttons for your UI, Simple Survey handles the state management and lets you render whatever you want. 

````onSurveyFinished```` and ````onAnswerSubmitted```` are the only callbacks that don't return a component.

### Navigation Callbacks 
The props ````renderPrevious````, ````renderNext````, ````renderFinished```` all have the same form.

|Parameter|Type|Description|
|---------|----|-----------|
|onPress|Callback (void)|Must be called when this component is activated (tapped, swiped, clicked, etc)|
|enabled|boolean|Indicates if this component should be enabled.|


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

|Parameter|Type|Description|
|---------|----|-----------|
|questionText|string\|\|object|Typically text of the question as specified in the JSON for this question. Since this is passed into your own rendering function, feel free to define an object in your JSON for more advanced scenarios.|

Sample usage

````JSX
const renderQuestionText = (questionText) => {
    return (<Text>{questionText}</Text>); 
}
````

### renderSelector
Must return a component. This is the UI element that will be shown for each option of a SelectionGroup and MultipleSelectionGroup, Buttons, radio buttons, sliders, whatever you want, so long as onPress gets called when the user has selected something.

|Variable|Type|Description|
|--------|----|-----|
|data|any|A complete copy of the 'value' field defined in the JSON object for this SelectionGroup. See example below.|
|index|number|Index of this option in the array of ````options```` that was passed to the SelectionGroup. Useful as key on your component.|
|isSelected|boolean|Indicates if the user has selected this option. |
|onPress|Callback (selection handler interface as defined in react-native-selection-group) | Must be called when the user has selected this component as their choice.|

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

|Parameter|Type|Description|
|---------|----|-----------|
|answers|Array|Array of JSON values as described below.|

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

Info questions are automatically removed from the returned array, only questions that have non-null answers will be returned. Questions with an assigned ```defaultValue``` in the JSON that the user has only *viewed* will also be returned.

### onQuestionAnswered
Called after the user activates the ````renderNext```` component.

|Parameter|Type|Description|
|---------|----|-----------|
|answers|string \|\| object|See description below|

```answer``` is the user input for Numeric and Text inputs, it is the entire Option object as specified in your JSON for a SelectionGroup.

As an example, from the sample JSON up above, if the user selected Dogs, onQuestionAnswered would receive

````JS
{ 
  optionText: "Dogs",
  value: "dog"
}
````

### renderTextInput
Must return a component. Renders input component for questions of type TextInput.

|Parameter|Type|Description|
|---------|----|-----------|
|onChange|Callback (string)|Must be called for every character input by the user|
|value|String|Current value of this field|
|placeHolder|String|Placeholder text as indicated in the JSON, will be null if not specified in the JSON|
|onBlur|Callback (void)|Function to be called when the text input field is blurred, used for auto-advancing, not needed if you are not enabling autoadvance.|

Example:

````JSX
const renderTextInput = (onChange, value, placeholder, onBlur) {
  return (<TextInput
    onChangeText={text => onChange(text)}
    value={value}
    placeholder={placeholder}
    onBlur={onBlur}
  />);
}
````

See the ExampleApp for a better styled, more functional, example.

### renderNumericInput
Must return a component. Renders input component for questions of type NumericInput. 

|Parameter|Type|Description|
|---------|----|-----------|
|onChange|Callback (string)|Must be called for every character input by the user|
|value|string|Current value of this field, empty string if the field is empty|
|placeholder|String| Placeholder text as indicated in the JSON, will be null if not specified in the JSON|
|onBlur|Callback (void)|Function to be called when the numeric input field is blurred, used for auto-advancing, not needed if you are not using autoadvance.|


Example:

````JSX
const renderNumericInput = (onChange, value, placeholder, onBlur) {
  return (<TextInput 
    style={styles.numericInput}
    onChangeText={text => { onChange(text); }}
    underlineColorAndroid={'white'}
    placeholderTextColor={'rgba(184,184,184,1)'}
    placeholder={placeHolder}
    value={String(value)}
    keyboardType={'numeric'}
    maxLength={3}
    onBlur={onBlur}
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
## JSON Schema
(in Typescript)

````Typescript
survey : Array<Info|TextInput|NumericInput|SelectionGroup|MultipleSelectionGroup>

interface Info: {
    questionType: "Info",
    questionText: string || object
}

interface TextInput: {
    questionType: "TextInput",
    questionText: string || object,
    questionId: string,
    placeholderText?: string,
    defaultValue?: string
}

interface NumericInput: {
    questionType: "NumericInput",
    questionText: string || object,
    questionId: string,
    placeholderText?: string || number,
    defaultValue?: string || number
}

interface SelectionGroupOption: {
    optionText: string,
    value: any
}

interface SelectionGroup: {
    questionType: "SelectionGroup",
    questionText: string || object,
    questionId: string,
    questionSettings: {
        autoAdvance: boolean,
        allowDeselection: boolean,
        defaultSelection: number,
    },
    options: SelectionGroupOption[]
    
}

interface MultipleSelectionGroup: {
    questionType: "MultipleSelectionGroup",
    questionText: string || object,
    questionId: string,
    questionSettings: {
        autoAdvance: boolean,
        allowDeselection: boolean,
        maxMultiSelect: number,
        minMultiSelect?: number,
        defaultSelection: Array<number>,
    },
    options: SelectionGroupOption[]
}
````

## Screenshot
![image](https://user-images.githubusercontent.com/11895351/53525490-c1a78f00-3a96-11e9-9291-f7c65b27f184.png)
