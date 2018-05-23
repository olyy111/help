import React from 'react'
import { List, Grid } from 'antd-mobile'


export default class extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            el: null
        }
    }
    select(el){
        this.setState({ el })
    }
    render() {
        const imgStr = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        const data = imgStr.split(',').map(v => ({ icon: require(`./imgs/${v}.png`), text: v }))
        
        const Header = this.state.el 
                        ? <div>已经选择头像<img src={this.state.el.icon} /></div>
                        : <div>还没有选择头像</div>
                        
        return (
            <div>
               {Header}
                <Grid 
                    data={data}
                    onClick={el => this.select(el)}
                ></Grid>
            </div>
        )
    }
}
