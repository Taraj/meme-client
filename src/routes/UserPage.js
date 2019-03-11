import React from 'react';

class UserPage extends React.Component {
    render() {
        return (
            <div>
                <div className="user-main">
                    <div className="user-main-avatar">
                        <img className="user-main-avatar-img" alt="qwe" src="https://i1.jbzdy.pl/users/default.jpg"/>
                    </div>
                    <div className="user-main-info">
                        <header className="user-main-info-nickname">
                            Taraj
                        </header>
                        <div>
                            <p>Liczba wpisów: 4</p>
                            <p>liczna komentarzy: 2</p>
                            <p>Data rejestracji: {new Date().toLocaleString("pl-PL")}</p>
                            <p>Karma: +158 / -2</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default UserPage
