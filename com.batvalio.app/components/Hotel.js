import React, { Component } from 'react'

export default class Hotel extends Component {
    render() {
        let { hotel } = this.props;

        return (
            <Link className="no-underline ma1" to={`/post/${this.props.post.id}`}>
                <article className="bb b--black-10">
                    <div className="flex flex-column flex-row-ns">
                        <div className="w-100 w-60-ns pl3-ns">
                            <h1 className="f3 fw1 baskerville mt0 lh-title">{title}</h1>
                            <p className="f6 f5-l lh-copy">{.text}</p>
                        </div>
                    </div>
                </article>
            </Link>
        )
    }
}

export class FormPreviewWidget extends React.Component {
    handleButtonPress = () => {
        const { onButtonPress } = this.props;

        if (onButtonPress && typeof onButtonPress === 'function')
            onButtonPress();
    }

    getButtonTitle = () => {
        const { formParties, loggedInUser } = this.props;
        const signed = formParties.find(party => party.signed && party.userId === loggedInUser.id);

        return signed ? 'VIEW' : 'SIGN';
    }

    getUserName = (userId) => {
        const { users } = this.props;
        return users.find(user => user.id === userId).name;
    }

    render() {
        const { formParties, formValues, formStatus, loading } = this.props;
        return (
            <View style={innerStyle.container}>

                {/* Claim form date & ID */}
                <View style={innerStyle.row}>
                    <View style={innerStyle.dateContainer}>
                        <Text style={innerStyle.date}>{getUserFriendlyDate(formValues)}</Text>
                    </View>
                    <Text style={innerStyle.id}>ID: {getClaimFormId(formValues)}</Text>
                </View>

                {/* AMHP organisation & claim form status */}
                <View style={[ innerStyle.row, { marginTop: 10 } ]}>
                    <Text style={innerStyle.ccg}>{getAmhpOrganisation(formValues)}</Text>
                    {
                        !formStatus ? null :
                            <View style={[innerStyle.statusContainer, { backgroundColor: statusColor[formStatus] }]}>
                                <Text style={innerStyle.status}>{formStatus.toUpperCase()}</Text>
                            </View>
                    }
                </View>

                {/* Patient address */}
                <View style={innerStyle.addressContainer}>
                    <Icon type="font-awesome" name="map-marker" size={20} color={color.grey} />
                    <Text style={innerStyle.address}>{getPatientAddress(formValues)}</Text>
                </View>

                {/* Claim form parties & sign/view button */}
                <View style={innerStyle.row}>
                    <FlatList
                        style={innerStyle.userList}
                        data={formParties}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={innerStyle.userItem}>
                                <Icon type="font-awesome" name="user" size={20} color={color.mainBlue} />
                                <Text style={innerStyle.userItemText}>{this.getUserName(item.userId)}</Text>
                            </View>
                        )}
                    />
                    {
                        !loading ? null :
                            <View style={{ alignSelf: 'flex-end', marginBottom: 5, marginRight: 5 }}>
                                <ActivityIndicator />
                            </View>
                    }
                    <Button
                        containerStyle={innerStyle.signButtonContainer}
                        buttonStyle={innerStyle.signButton}
                        titleStyle={innerStyle.signButtonTitle}
                        title={this.getButtonTitle()}
                        disabled={loading}
                        onPress={this.handleButtonPress}
                    />
                </View>

            </View>
        )
    }
}
