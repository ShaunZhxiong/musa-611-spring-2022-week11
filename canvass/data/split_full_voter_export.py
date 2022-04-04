import csv
import json
import pathlib
import sys
import click

from fve import read_fve_data, fve_fields


@click.command()
@click.argument('outdir', type=click.Path())
@click.option('--fve', type=click.File('r'), default=sys.stdin)
def split_full_voter_export(outdir, fve):
    outpaths = {}

    # I'm interested in democrats my precinct: Ward 39, Div 27.
    print('Writing CSV files...')
    for row in read_fve_data(fve):
        precinct = row['Precinct Code']
        if not precinct in outpaths:
            outpath = pathlib.Path(outdir) / f'precinct{precinct}.csv'
            outpaths[precinct] = outpath
            mode = 'w'
        else:
            outpath = outpaths[precinct]
            mode = 'a'

        with outpath.open(mode) as outfile:
            writer = csv.DictWriter(outfile, fieldnames=fve_fields)
            if (mode == 'w'):
                writer.writeheader()
            writer.writerow(row)

    print('Writing JSON files...')
    for precinct, csvpath in outpaths.items():
        jsonpath = pathlib.Path(outdir) / f'precinct{precinct}.json'

        with csvpath.open('r') as csvfile:
            with jsonpath.open('w') as jsonfile:
                reader = csv.DictReader(csvfile, fieldnames=fve_fields)
                json.dump(list(reader), jsonfile)

    print('Done.')


if __name__ == '__main__':
    split_full_voter_export()
