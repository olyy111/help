import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'antd-mobile'


export default class extends React.Component {
    constructor(props){
        super(props)
    }

    static propTypes = {
        selectAvatar: PropTypes.func.isRequired,
        avatar: PropTypes.string
    }

    select(el){
        this.props.selectAvatar(el.text)
    }
    render() {
        const imgStr = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        const data = imgStr.split(',').map(v => ({ icon: require(`../../assets/imgs/avatars/${v}.png`), text: v }))
        
        const Header = this.props.avatar
                        ? <div>已经选择头像<img src={require(`./imgs/${this.props.avatar}.png`)} /></div>
                        : <div>还没有选择头像</div>
                        
        return (
            <div>
               {Header}
                <Grid 
                    data={data}
                    columnNum="5"
                    onClick={el => this.select(el)}
                ></Grid>
            </div>
        )
    }
}
