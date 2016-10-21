import React from 'react'
import InputText from '../components/InputText.jsx'
import TextArea from '../components/TextArea.jsx'
import Button from '../components/Button.jsx'

class TextBox extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handleReadButton = this.handleReadButton.bind(this)
  }

  handleReadButton () {
    console.log('carreguei man...')
  }

  render () {
    return (
      <div className={this.props.className}>
        <div className='stories-feed-stories-story-title-box'>
          <p className='stories-feed-stories-story-title' disabled={true} readonly={true}>Este é o tiulo da minha casinha e da minh histori titulo da minha historia linda @Lisbon</p>
        </div>
        <div className='stories-feed-stories-story-text'> 'A sua alma ja nao conhecia o destino que lhe estava destinado.\n  Era sempre a sua a compra que se seguiria no encaldo do seu namorado amarelo. Qualquer semelhanca com a realidade esqualida e moderna era prontamente inorado pelo sau sanitaria.\n No segundo ano da sua existencia pacifica no meio de uma histori de odio foi provocada pelo estocada mortal no seu coracao de pratya e estanho./n Quando nao era a sua alma que fazia  desgraca era certamente o mento da abertura ao ceu quente e humido que enaltecia a poesia da minha alma estragda pelos anos que estriam par vir dentro da soupar afabateciada esclorotica do meu caminho mais alterado do seu ser'
        </div>
        <div className='stories-feed-stories-story-footer'>
          <Button className='stories-feed-stories-story-footer-read' value='READ' disabled={false} onClick={this.handleReadButton} />
        </div>
      </div>
    )
  }
}

TextBox.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  story: React.PropTypes.string
}

TextBox.defaultProps = {}

export default TextBox
