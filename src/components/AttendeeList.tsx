import React from 'react';
import {
    ThemeProvider,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableCell,
    TableBody,
    TableRow
} from '@material-ui/core';
import { mainTheme } from '../App';
import { IAttendeeData } from '../events/PresenterEvents';
import AttendeeListItem from './AttendeeListItem';

interface Props {
    attendees: IAttendeeData[];
    slideIndex: number;
}

export default class AttendeeList extends React.Component<Props> {
    render() {
        return (
            <ThemeProvider theme={mainTheme}>
                <TableContainer
                    component={Paper}
                    square={true}
                    style={{ minWidth: '200px', height: '100%' }}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Attendees</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props?.attendees?.map(attendee => (
                                <TableRow key={attendee.name}>
                                    <TableCell variant='body'>
                                        <AttendeeListItem
                                            slideIndex={this.props.slideIndex}
                                            attendee={attendee}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>
        );
    }

    componentDidMount() {}
}
