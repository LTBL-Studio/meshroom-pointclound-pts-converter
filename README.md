# Meshroom Point Cloud to PTS file

Small script converting [Meshroom](https://alicevision.org/#meshroom) Point clound JSON to PTS point cloud file.
PTS file format is described on [paulbourke.net/dataformats/pts/](http://paulbourke.net/dataformats/pts/).

# Install

Clone this repository

Install dependencies

```
npm i
```

Extract Meshroom point cloud by adding a [**ConvertSfMFormat**](https://meshroom-manual.readthedocs.io/en/latest/feature-documentation/nodes/ConvertSfMFormat.html) node to **SFMTransform** output and selecting `json` as output format.

convert your JSON file

```
node index.js meshroom-file.json
```

The resulting file is written into `meshroom-file.pts`

# Usage

The resulting file can be loaded into Unreal Engine 4 using [Point cloud plugin](https://pointcloudplugin.com/).
