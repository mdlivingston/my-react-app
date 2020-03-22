import * as React from 'react';
import { fetchPokemon } from '../api/Api';
import { Box, TextField } from '@material-ui/core';

export interface PokemonProps {
    name: string;
}

export interface PokemonState {
    pokemon: any;
}

class Pokemon extends React.Component<PokemonProps, PokemonState> {
    state: PokemonState = { pokemon: '' };

    getPokemon(pokemon: string) {
        this.setState({ pokemon: <h1>Loading...</h1> })
        fetchPokemon(pokemon)
            .then((pokemonData) => {
                console.log(pokemonData);
                this.setState({
                    pokemon:
                        <Box>
                            <img height={175} src={pokemonData.sprites.front_default} alt="Pokemon"></img>
                            <h1>Name: {pokemonData.name}</h1>
                            <h1>Height: {pokemonData.height}</h1>
                            <h1>Abilities: {pokemonData.abilities.map((a: any) => a.ability.name).toString()}</h1>
                            <h1>Types: {pokemonData.types.map((a: any) => a.type.name).toString()}</h1>
                        </Box>
                })
            })
            .catch((error: any) => {
                this.setState({ pokemon: <h1 style={{ color: 'red' }}>Cannot find pokemon. :(</h1> })
            });
    }

    componentDidMount() {
        //this.getPokemon();
        console.log(this.props)
    }

    render() {
        return (
            <React.Fragment>
                <Box style={{ textAlign: 'center' }} m={10}>
                    <TextField id="outlined-basic" label="Search pokemon..." onKeyDown={this.handleGettingPokemon} variant="outlined" />
                    {this.state.pokemon}
                </Box>
            </React.Fragment>
        );
    }

    handleGettingPokemon = (event: any) => {
        if (event.key === 'Enter') {
            this.getPokemon(event.target.value);
        }

    }
}

export default Pokemon;