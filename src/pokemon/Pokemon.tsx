import { Box, Card, CardContent, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { fetchPokemon } from '../Api/Api';



export interface PokemonProps
{
    name: string;
}

export interface PokemonState
{
    pokemon: any;
}



class Pokemon extends React.Component<PokemonProps, PokemonState> {
    state: PokemonState = { pokemon: '' };

    getPokemon(pokemon: string)
    {

        this.setState({ pokemon: <h1>Loading...</h1> })
        fetchPokemon(pokemon)
            .then((pokemonData) =>
            {
                console.log(pokemonData);
                this.setState({
                    pokemon:
                        <Card elevation={10} style={{ width: 275 }}>
                            <Box textAlign={'center'}>
                                <img src={pokemonData.sprites.front_default} alt="Pokemon"></img>
                            </Box>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {pokemonData.name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Height: {pokemonData.height}
                                    <br />
                                    Abilities: {pokemonData.abilities.map((a: any) => a.ability.name).toString()}
                                    <br />
                                    Types: {pokemonData.types.map((a: any) => a.type.name).toString()}
                                </Typography>


                            </CardContent>
                        </Card>

                })
            })
            .catch((error: any) =>
            {
                this.setState({ pokemon: <h1 style={{ color: 'red' }}>Cannot find pokemon. :(</h1> })
            });
    }

    componentDidMount()
    {
        //this.getPokemon();
        console.log(this.props)
    }

    render()
    {
        return (
            <React.Fragment>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} m={10}>
                    <TextField id="outlined-basic" label="Search pokemon..." onKeyDown={this.handleGettingPokemon} variant="outlined" />
                </Box>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {this.state.pokemon}
                </Box>
            </React.Fragment>
        );
    }

    handleGettingPokemon = (event: any) =>
    {
        if (event.key === 'Enter')
        {
            this.getPokemon(event.target.value);
        }

    }
}

export default Pokemon;