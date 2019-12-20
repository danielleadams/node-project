{
  "targets": [
    {
      "target_name": "add",
      "sources": [ "add.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
