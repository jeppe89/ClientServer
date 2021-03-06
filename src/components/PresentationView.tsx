import React from 'react';
import { createMuiTheme, Paper, ThemeProvider } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { lime, orange } from '@material-ui/core/colors';
import PlainSlideContent from './PlainSlideContent';
import MultipleChoiceSlideContent from './MultipleChoiceSlideContent';
import TextAnswerSlideContent from './TextAnswerSlideContent';
import SlideContent from '../SlideContent';
import SlideChoiceSlideContent from './SlideChoiceSlide';

export const presentationTheme: Theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: lime,
        secondary: orange
    },
    typography: {
        body1: { fontSize: '1.2em' }
    }
});

interface Props {
    controller: string;
    onClick?: () => void;
    showSlideCount: boolean;
    content: SlideContent;
    slideIndex: number;
    socket: SocketIOClient.Socket;
}

export default class PresentationView extends React.Component<Props> {
    render() {
        return (
            <Paper
                square
                style={{
                    height: '100%',
                    width: '100%'
                }}>
                <ThemeProvider theme={presentationTheme}>
                    <Paper
                        onClick={this.presentationClicked}
                        style={{
                            height: '100%',
                            width: '100%'
                        }}>
                        {this.renderContent()}
                    </Paper>
                </ThemeProvider>
            </Paper>
        );
    }

    private renderContent = () => {
        if (!this.props.content) {
            console.log(this.props);
            return '';
        }
        switch (this.props.content.type) {
            case 'PlainSlide':
                return (
                    <PlainSlideContent
                        controller={this.props.controller}
                        slide={this.props.content}></PlainSlideContent>
                );
            case 'MultipleChoiceSlide':
                return (
                    <MultipleChoiceSlideContent
                        socket={this.props.socket}
                        slideIndex={this.props.slideIndex}
                        controller={this.props.controller}
                        slide={this.props.content}></MultipleChoiceSlideContent>
                );
            case 'TextAnswerSlide':
                return (
                    <TextAnswerSlideContent
                        socket={this.props.socket}
                        slideIndex={this.props.slideIndex}
                        controller={this.props.controller}
                        slide={this.props.content}></TextAnswerSlideContent>
                );
            case 'SlideChoiceSlide':
                return (
                    <SlideChoiceSlideContent
                        socket={this.props.socket}
                        slideIndex={this.props.slideIndex}
                        controller={this.props.controller}
                        slide={this.props.content}></SlideChoiceSlideContent>
                );
            default:
                console.log(this.props.content);
                return '';
        }
    };

    private presentationClicked = () => {
        if (this.props.onClick === undefined) return;
        this.props.onClick!();
    };
}
