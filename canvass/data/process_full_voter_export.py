import sys
import json
import click

from fve import read_fve_data, filter_by_party, filter_by_precinct


@click.command()
@click.option('--precinct', default='3927')
@click.option('--fve', type=click.File('r'), default=sys.stdin)
def process_full_voter_export(precinct, fve):
    # I'm interested in democrats my precinct: Ward 39, Div 27.
    data = filter_by_party(
        filter_by_precinct(
            read_fve_data(fve),
            precinct,
        ),
        'D',
    )
    print(json.dumps(list(data), indent=1))

    # The data that is output has shortcomings:
    # * The district fields aren't so useful after filtering by precinct
    # * It's good data to stick in a data warehouse, but bad to return
    #   from an API.


if __name__ == '__main__':
    process_full_voter_export()
