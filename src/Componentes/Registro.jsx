

const Registro = () => {
    return (
        <div>
            <h1>Registro de cuenta</h1>
            <form>
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" placeholder="Nombre" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Email" />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Contraseña" />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Registro;