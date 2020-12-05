# Code by Francisco Santana (https://franciscosp.com).
# This file is meant to add a new post by creating a properly-formatted markdown file (with metadata).
# You are free to copy this code, so long as proper attribution is provided.

param(
	[Parameter(Mandatory = $false)]
	[String] $Title,
	[Parameter(Mandatory = $false)]
	[String] $Author,
	[Parameter(Mandatory = $false)]
	[Switch] $Wide,
	[Parameter(Mandatory = $false)]
	[Switch] $DoComments,
	[Parameter(Mandatory = $false)]
	[Switch] $DoTOC,
	[Parameter(Mandatory = $false)]
	[String] $HeaderImage = $null,
	[Parameter(mandatory=$false)]
	[Switch] $OverlayHeaderImage,
	[Parameter(Mandatory=$false)]
	[String] $Excerpt = $null
)

$time = (Get-Date -Format "hh-mm-ss K").replace(":", "").replace("-", ":")
$date = Get-Date -Format "yyyy-MM-dd"

$content = "---`r`ntitle: $Title`r`ndate: $date $time"
if($Excerpt -ne $null) { $content = $content + "`r`nexcerpt: $Excerpt # Add an excerpt here!`r`n" }
else { $content = $content + "`r`n#excerpt: $Excerpt # Add an excerpt here!`r`n" }

$content = $content + "`r`ncategories: # Add categories here!"

$content = $content + "`r`ntags: # Add tags here!"

$content = $content + "`r`n`r`nauthor: $Author`r`n"

if ($Wide) { $content = $content + "`r`nclasses: wide" }

if ($DoComments) { $content = $content + "`r`ncomments: true # Set this to 'false' to disable comments!" }

if ($DoTOC) { $content = $content + "`r`ntoc: true # Set this to 'false' to disable the table of contents. `r`ntoc_label: ""$Title"" # Set the title of the table of contents here!`r`ntoc_icon: ""cog""" }

if ($HeaderImage -ne $null -or $OgHeaderImage -ne $null) {
	$content = $content + "`r`nheader:"
	if($HeaderImage -ne $null){
		if($OverlayHeaderImage) { $content = $content + "`r`n#  overlay_image: $HeaderImage # Set the header image here!" }
		else { $content = $content + "`r`n#  image: $HeaderImage # Set the header image here!" }
	}
	else{
		$content = $content + "`r`n#  image: # Set the header image here!"
	}
	$content = $content + "`r`n#  caption: # Put a caption here. It could be an attribution!"
	$content = $content + "`r`n#  actions: # Put some actions here, such as a button."
}

$content = $content + "`r`ncategory_archive:`r`n  path: # Add a category path here!"
$content = $content + "`r`ntag_archive:`r`n  path: # Add a tag path here!"

$content = $content + "`r`n`n# Add content below the line!`r`n---"

$file = "./_posts/$date-" + $Title.replace(" ", "-") + ".md"

New-Item -Path $file
Add-Content -Path $file -Value $content

Write-Host "Successfully created a new blog post in $file.`n`tOpen it and modify its contents!"