import { Box, Button, Card, CardContent, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { useRef, useState } from 'react';
import { fetchPokemon } from '../Api/Api';

function Pokemon()
{
	function getPokemon(name)
	{
		setIsLoading(true)

		fetchPokemon(name).then(pokemonData =>
		{
			setIsLoading(false)
			setPokemonData(pokemonData)
		}, error =>
		{
			setIsLoading(false)
			setError(error.status)
		});

	}

	function handleGettingPokemon(event)
	{
		if (event.key === 'Enter' || event === 'button')
		{
			setPokemonData(null);
			setError(null);
			getPokemon(pokemonRef.current.value);
		}
	}

	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [pokemonData, setPokemonData] = useState(null);

	const pokemonRef = useRef();

	return (
		<React.Fragment>
			<Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }} >
				<TextField id="outlined-basic" label="Search pokemon..." onKeyDown={handleGettingPokemon} inputRef={pokemonRef} variant="outlined" />
			</Box>
			<Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>
				<Button onClick={() => handleGettingPokemon('button')}>Search</Button>
			</Box>
			<Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				{isLoading ? <div>Loading...</div> : ''}
				{!isLoading && error ? <div>{error}</div> : ''}
				{!isLoading && pokemonData ?
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
                                    Abilities: {pokemonData.abilities.map((a) => a.ability.name).toString()}
								<br />
                                    Types: {pokemonData.types.map((a) => a.type.name).toString()}
							</Typography>
						</CardContent>
					</Card> : ''}
			</Box>
		</React.Fragment>
	);
}

export default Pokemon;